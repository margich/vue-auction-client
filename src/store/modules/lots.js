import axios from 'axios'
import Vue from 'vue'
const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
  // user: null,
  lots: [],
  vehicles: [],
  makes: [],
  categories: [],
  bids: [],
  wins: [],
  timer: 120,
  timer_status: 0,
  status: '',
  type: null,
  message: null
}

const getters = {
  getTimerStatus (state) {
    return state.timer_status
  },
  user (state) {
    return state.user
  },
  wins (state) {
    return state.wins
  },
  allLots (state) {
    return state.lots
  },
  allMakes (state) {
    return state.makes
  },
  allCategories (state) {
    return state.categories
  },
  liveLots: (state) => (now) => {
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    let currentTime = new Date().getTime()
    return state.lots.filter(lot => lot.completed === 0 && new Date(lot.time_live).getFullYear() === currentYear && new Date(lot.time_live).getMonth() === currentMonth && new Date(lot.time_live).getDate() === currentDate && currentTime >= new Date(lot.time_live).getTime() && currentTime <= new Date(lot.end_live).getTime())
    // return state.lots.filter(lot => now >= new Date(lot.time_live).getTime() && now <= new Date(lot.end_live).getTime())
  },
  upcomingLots: (state) => (now) => {
    return state.lots.filter(lot => now < new Date(lot.time_live).getTime())
  },
  todaysLots (state) {
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let currentDate = new Date().getDate()
    return state.lots.filter(lot => new Date(lot.time_live).getFullYear() === currentYear && new Date(lot.time_live).getMonth() === currentMonth && new Date(lot.time_live).getDate() === currentDate)
  },
  currentVehicle: (state) => (id) => {
    let now = new Date().getTime()
    return state.vehicles.find(vehicle => vehicle.lotId === id && now < new Date(vehicle.end_time).getTime() && now <= new Date(vehicle.end_time).getTime())
    // const { now, lot } = data
    // return state.vehicles.find(vehicle => vehicle.lotId === lot && now < Math.trunc((new Date(vehicle.end_time)).getTime() / 1000))
  },
  allVehicles (state) {
    return state.vehicles
  },
  getNumberOfVehiclesInLot: (state) => (id) => {
    return state.vehicles.filter(vehicle => vehicle.lotId === id).length
  },
  getTopBid: (state) => (id) => {
    return state.vehicles.filter(vehicle => vehicle.id === id)
  },
  lotVehicles: (state) => (id) => {
    // return state.vehicles.filter(vehicle => vehicle.lotId === id && vehicle.completed === 0)
    const v = state.vehicles.filter(vehicle => vehicle.lotId === id && vehicle.completed === 0)
    const vehicles = v.map(v => {
      return {
        id: v.id,
        lot: v.lotId,
        model: v.model,
        make: state.makes.find(make => make.id === v.makeId),
        year: v.year,
        start_time: v.start_time,
        end_time: v.end_time,
        est_retail_value: v.est_retail_value,
        top_bid: v.top_bid,
        images: v.images,
        left_image: v.images.find(images => images.image_type === 'left'),
        right_image: v.images.find(images => images.image_type === 'right'),
        front_image: v.images.find(images => images.image_type === 'front'),
        back_image: v.images.find(images => images.image_type === 'back'),
        sold: v.sold
      }
    })
    return vehicles
  },
  makeVehicles: (state) => (id) => {
    // return state.vehicles.filter(vehicle => vehicle.makeId === id && vehicle.completed === 0)
    // const m = state.makes.find(make => make.id === id)
    const v = state.vehicles.filter(vehicle => vehicle.makeId === id && vehicle.completed === 0)
    const vehicles = v.map(v => {
      return {
        id: v.id,
        lot: v.lotId,
        model: v.model,
        make: state.makes.find(make => make.id === v.makeId),
        year: v.year,
        start_time: v.start_time,
        end_time: v.end_time,
        est_retail_value: v.est_retail_value,
        top_bid: v.top_bid,
        images: v.images,
        left_image: v.images.find(images => images.image_type === 'left'),
        right_image: v.images.find(images => images.image_type === 'right'),
        front_image: v.images.find(images => images.image_type === 'front'),
        back_image: v.images.find(images => images.image_type === 'back'),
        sold: v.sold
      }
    })
    return vehicles
  },
  countMakeVehicles: (state) => (id) => {
    return state.vehicles.filter(vehicle => vehicle.makeId === id && vehicle.completed === 0).length
  },
  categoryVehicles: (state) => (id) => {
    // return state.vehicles.filter(vehicle => vehicle.categoryId === id && vehicle.completed === 0)
    const v = state.vehicles.filter(vehicle => vehicle.categoryId === id && vehicle.completed === 0)
    const vehicles = v.map(v => {
      return {
        id: v.id,
        lot: v.lotId,
        model: v.model,
        make: state.makes.find(make => make.id === v.makeId),
        year: v.year,
        start_time: v.start_time,
        end_time: v.end_time,
        est_retail_value: v.est_retail_value,
        top_bid: v.top_bid,
        images: v.images,
        left_image: v.images.find(images => images.image_type === 'left'),
        right_image: v.images.find(images => images.image_type === 'right'),
        front_image: v.images.find(images => images.image_type === 'front'),
        back_image: v.images.find(images => images.image_type === 'back'),
        sold: v.sold
      }
    })
    return vehicles
  },
  countCategoryVehicles: (state) => (id) => {
    return state.vehicles.filter(vehicle => vehicle.categoryId === id && vehicle.completed === 0).length
  },
  makeById: (state) => (id) => {
    return state.makes.find(make => make.id === id)
  },
  categoryById: (state) => (id) => {
    return state.categories.find(category => category.id === id)
  },
  vehicleById: (state) => (id) => {
    return state.vehicles.find(vehicle => vehicle.id === id)
  },
  lotById: (state) => (id) => {
    return state.lots.find(lot => lot.id === id)
  },
  vehicleBids: (state) => (id) => {
    return state.bids.filter(bids => bids.vehicleId === id)
  },
  userBids (state) {
    // return state.bids.filter(bid => bid.userId === state.user.id)
    const b = state.bids.filter(bid => bid.user_id === state.user.id)
    const bids = b.map(b => {
      const v = state.vehicles.find(vehicle => vehicle.id === b.vehicle_id)
      return {
        id: b.id,
        vehicle: state.vehicles.find(vehicle => vehicle.id === b.vehicle_id),
        year: v.year,
        make: state.makes.find(make => make.id === v.make_id),
        model: v.model,
        top_bid: v.top_bid,
        reserve_price: v.reserve_price,
        bid_amount: b.bid_amount,
        created_At: b.createdAt
      }
    })
    return bids
  },
  winningBids (getters) {
    const b = state.bids.filter(bid => bid.user_id === state.user.id)
    const bids = b.map(b => {
      const v = state.vehicles.find(vehicle => vehicle.id === b.vehicle_id)
      return {
        id: b.id,
        vehicle: state.vehicles.find(vehicle => vehicle.id === b.vehicle_id),
        year: v.year,
        make: state.makes.find(make => make.id === v.make_id),
        model: v.model,
        bid_amount: b.bid_amount,
        created_At: b.createdAt
      }
    })
    return bids
  },
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  status: state => state.status,
  message: state => state.message,
  type: state => state.type
}

const actions = {
  socket_timer: ({commit, state}, params) => {
    Vue.prototype.$socket.emit('timer', params)
  },
  socket_timer_status: ({commit, state}, params) => {
    Vue.prototype.$socket.emit('timer_status', params)
  },
  async fetchLots ({
    commit
  }) {
    const response = await axios.get('http://localhost:3000/api/v1/lots')
    commit('setLots', response.data.result)
  },
  async fetchVehicles ({
    commit
  }) {
    const response = await axios.get('http://localhost:3000/api/v1/vehicles')
    commit('setVehicles', response.data.result)
  },
  async fetchBids ({
    commit
  }) {
    const response = await axios.get('http://localhost:3000/api/v1/bids')
    commit('setBids', response.data.result)
  },
  async fetchMakes ({
    commit
  }) {
    const response = await axios.get('http://localhost:3000/api/v1/makes')
    commit('setMakes', response.data.result)
  },
  async fetchCategories ({
    commit
  }) {
    const response = await axios.get('http://localhost:3000/api/v1/categories')
    commit('setCategories', response.data.result)
  },
  async vehicleCompleted ({ commit }, bid) {
    const response = await axios.patch(`http://localhost:3000/api/v1/vehicles/${bid.vehicle}/complete`)
    commit('updateVehicle', response.data)
  },
  async lotCompleted ({ commit }, lot) {
    const response = await axios.patch(`http://localhost:3000/api/v1/lots/${lot}/complete`)
    commit('updateLot', response.data)
  },
  async vehicleSold ({ commit }, bid) {
    const response = await axios.patch(`http://localhost:3000/api/v1/vehicles/${bid.vehicle}/sold`)
    commit('updateVehicle', response.data)
  },
  async newBid ({ commit }, bid) {
    const response = await axios.post('http://localhost:3000/api/v1/bids', {bid_amount: bid.amount, vehicle_id: bid.vehicle, user_id: bid.user})
    commit('newBid', response.data.createdBid)
  },
  async updateTopBid ({ commit }, bid) {
    const response = await axios.patch(`http://localhost:3000/api/v1/vehicles/${bid.vehicle}/bid`, {bid: bid.amount})
    commit('updateVehicle', response.data)
  },
  async socket_update_top_bid ({ commit }, bid) {
    const response = await axios.patch(`http://localhost:3000/api/v1/vehicles/${bid.vehicle}/bid`, {bid: bid.amount})
    const update = response.data.result
    Vue.prototype.$socket.emit('update_top_bid', update)
  },
  async socket_new_bid ({ commit }, bid) {
    console.log(bid)
    const response = await axios.post('http://localhost:3000/api/v1/bids', {bid_amount: bid.amount, vehicle_id: bid.vehicle, user_id: bid.user})
    const newbid = response.data.result
    Vue.prototype.$socket.emit('new_bid', newbid)
  },
  async socket_update_timers ({ commit }, data) {
    const response = await axios.get(`http://localhost:3000/api/v1/vehicles/${data.lot}/lot`)
    const vehicles = response.data.result
    const lotTimer = data.timer
    const date = new Date()
    const parsedDate = new Date(Date.parse(date))
    const endLot = new Date(Date.parse(data.endLot))
    console.log(data)
    for (let vehicle of vehicles) {
      const id = vehicle['id']
      const length = lotTimer * vehicle['lot_number']
      const diff = lotTimer - data.remaining
      const start = length - lotTimer
      const newStartTime = new Date(parsedDate.getTime() + (1000 * start))
      const newEndTime = new Date(parsedDate.getTime() + (1000 * length))
      if (data.vehicle === id) {
        const endTime = new Date(parsedDate.getTime() + (1000 * (data.remaining + diff)))
        await axios.patch(`http://localhost:3000/api/v1/vehicles/${id}`, {end_time: endTime, updated_at: date})
      }
      if (vehicle['lot_number'] > data.number) {
        await axios.patch(`http://localhost:3000/api/v1/vehicles/${id}`, {start_time: newStartTime, end_time: newEndTime, updated_at: date})
      }
    }
    const newLotEndTime = new Date(endLot.getTime() + (1000 * (lotTimer - data.remaining)))
    await axios.patch(`http://localhost:3000/api/v1/lots/${data.lot}`, {end_live: newLotEndTime, updated_at: date})

    const updateL = await axios.get(`http://localhost:3000/api/v1/lots/${data.lot}`)
    const updatedLot = updateL.data.result
    const updateV = await axios.get('http://localhost:3000/api/v1/vehicles')
    const updatedVehicle = updateV.data.result
    Vue.prototype.$socket.emit('update', updatedVehicle, updatedLot)
  },
  setTimer ({ commit }, timer) {
    commit('setTimer', timer)
  },
  setAuthError ({ commit }, error) {
    commit('auth_error', error)
  },
  setAuthSuccess ({ commit }, success) {
    commit('success_message', success)
  },
  setMessage ({ commit }, message) {
    commit('message', message)
  },
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/api/v1/users/login', {email: user.email, password: user.password})
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', resp.data)
          commit('success', {message: 'Successfully logged in'})
          // commit('message', {status: 'success', message: 'Successfully logged in!'})
          resolve(resp)
        })
        .catch(err => {
          const message = 'Login Failed!'
          commit('error', {message: message})
          // commit('message', {status: 'error', message: error})
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          reject(err)
        })
    })
  },
  register ({ commit }, user) {
    return new Promise((resolve, reject) => {
      const fullName = user.firstName + ' ' + user.lastName
      const phoneNo = '+254' + user.phoneNo
      axios.post('http://localhost:3000/api/v1/users/register', {
        email: user.email, full_name: fullName, phone_number: phoneNo, id_number: user.idNumber, city: user.city, region: user.region, street: user.street, password: user.password, confirm: user.confirm
      })
        .then(resp => {
          commit('success', {message: 'Successfully created account!'})
          resolve(resp)
        })
        .catch(err => {
          const error = 'Registration failed!'
          commit('auth_error')
          commit('error', {message: error})
          reject(err)
        })
    })
  },
  edit ({ commit }, user) {
    return new Promise((resolve, reject) => {
      // const fullName = user.firstName + ' ' + user.lastName
      // const phoneNo = '+254' + user.phone
      axios.patch(`http://localhost:3000/api/v1/users/${user.id}`, {
        email: user.email, full_name: user.fullName, phone_number: user.phoneNo, id_number: user.idNumber, city: user.city, region: user.region, street: user.street, password: user.password
      })
        .then(resp => {
          const user = resp.data.user
          localStorage.setItem('user', JSON.stringify(user))
          commit('setUser', resp.data)
          commit('message', {status: 'success', message: 'Successfully updated account!'})
          resolve(resp)
        })
        .catch(err => {
          const error = 'Update failed!'
          commit('auth_error')
          commit('message', {status: 'error', message: error})
          reject(err)
        })
    })
  },
  edit_password ({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios.patch(`http://localhost:3000/api/v1/users/${user.id}/password`, {
        email: user.email, password: user.password, oldPassword: user.oldPassword, confirm: user.confirm, newPassword: user.newPassword
      })
        .then(resp => {
          const user = resp.data.user
          localStorage.setItem('user', JSON.stringify(user))
          commit('setUser', resp.data)
          commit('message', {status: 'success', message: 'Successfully updated account!'})
          resolve(resp)
        })
        .catch(err => {
          const error = 'Update failed!'
          commit('auth_error')
          commit('message', {status: 'error', message: error})
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      commit('success', {message: 'Successfully logged out!'})
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  success ({ commit }, message) {
    commit('success', message)
  },
  error ({ commit }, message) {
    commit('error', message)
  },
  clear ({ commit }) {
    commit('clear')
  }
}

const mutations = {
  SOCKET_UPDATE_VEHICLES (state, updatedVehicle) {
    state.vehicles = updatedVehicle
  },
  SOCKET_UPDATE_LOT: (state, updatedLot) => {
    state.updatedLot = state.lots.map(lot => {
      if (lot.id === updatedLot.id) {
        return Object.assign({}, lot, updatedLot)
      }
      return lot
    })
  },
  SOCKET_NEW_BID (state, bid) {
    state.bids.unshift(bid)
  },
  SOCKET_UPDATE_TOP_BID (state, update) {
    state.vehicles = state.vehicles.map(vehicle => {
      if (vehicle.id === update.id) {
        return Object.assign({}, vehicle, update)
      }
      return vehicle
    })
  },
  setUser: (state, user) => (state.user = user),
  setLots: (state, lots) => (state.lots = lots),
  setVehicles: (state, vehicles) => (state.vehicles = vehicles),
  setBids: (state, bids) => (state.bids = bids),
  setMakes: (state, makes) => (state.makes = makes),
  setCategories: (state, categories) => (state.categories = categories),
  newBid: (state, bid) => (state.bids.unshift(bid)),
  updateVehicle: (state, update) => {
    // const index = state.vehicles.findIndex(vehicle => vehicle.id === update.id)
    state.vehicles = state.vehicles.map(vehicle => {
      if (vehicle.id === update.id) {
        return Object.assign({}, vehicle, update)
      }
      return vehicle
    })
  },
  setTimer (state, timer) {
    state.timer = timer
  },
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, payload) {
    state.token = payload.token
    state.user = payload.user
  },
  auth_error (state) {
    state.token = ''
    state.user = ''
  },
  success (state, message) {
    state.type = 'success'
    state.message = message
  },
  error (state, message) {
    state.type = 'danger'
    state.message = message
  },
  clear (state) {
    state.type = null
    state.message = null
  },
  message (state, payload) {
    state.status = payload.status
    state.message = payload.message
  },
  logout (state) {
    state.status = ''
    state.token = ''
    state.user = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
