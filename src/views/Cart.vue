<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-12">
          <h1 class="text-center" style="color:#1C82C2;">Cart</h1>
          <hr>
          <div class="table-responsive-sm">
            <table class="table table-bordered table-sm table-stripped">
              <thead class="bg-light">
                <th></th>
                <th>Vehicle</th>
                <th>Price</th>
              </thead>
              <tbody>
                <tr>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Totals</h4><hr>
          <div class="table-responsive-sm">
            <table class="table table-bordered table-sm table-stripped">
              <thead class="bg-light">
                <th class="text-center">No. of Vehicles</th>
                <th class="text-center">Grand Total</th>
              </thead>
              <tbody>
                <tr class="text-right">
                  <td>
                    dfs
                  </td>
                  <td class="bg-success">
                    4343
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h3>Shipping Address</h3><hr>
          <form>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="first name">First name <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="firstName" id="firstName">
              </div>
              <div class="col-md-6 mb-3">
                <label for="last name">Last name <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="lastName" id="lastName">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="email">Email Address <span class="text-muted">(Required)</span></label>
                <input type="email" class="form-control" name="email" id="email">
              </div>
              <div class="col-md-6 mb-3">
                <label for="phone number">Phone Number <span class="text-muted">(Required)</span></label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">+254</span>
                  </div>
                  <input type="number" class="form-control" name="phoneNo" id="phoneNo">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="country">City <span class="text-muted">(Required)</span></label>
                <select class="custom-select d-block w-100" id="country" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="state">Region <span class="text-muted">(Required)</span></label>
                <select class="custom-select d-block w-100" id="state" required>
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div class="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="first name">Street <span class="text-muted">(Required)</span></label>
                <input type="text" class="form-control" name="firstName" id="firstName">
              </div>
            </div>

            <hr class="mb-4">
            <h4>Payment</h4>
            <div class="row">
              <div class="col-6">
                <div class="d-block my-3">
                  <div class="custom-control custom-radio">
                    <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                    <label class="custom-control-label" for="credit">Credit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
                    <label class="custom-control-label" for="debit">Debit card</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
                    <label class="custom-control-label" for="paypal">PayPal</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cc-name">Name on card <span class="text-muted">(Required)</span></label>
                    <input type="text" class="form-control" id="cc-name" placeholder="" required>
                    <small class="text-muted">Full name as displayed on card</small>
                    <div class="invalid-feedback">
                      Name on card is required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cc-number">Credit card number <span class="text-muted">(Required)</span></label>
                    <input type="text" class="form-control" id="cc-number" placeholder="" required>
                    <div class="invalid-feedback">
                      Credit card number is required
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="cc-expiration">Expiration <span class="text-muted">(Required)</span></label>
                    <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                    <div class="invalid-feedback">
                      Expiration date required
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="cc-cvv">CVV <span class="text-muted">(Required)</span></label>
                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                    <div class="invalid-feedback">
                      Security code required
                    </div>
                  </div>
                </div>
                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
export default {
  name: 'Cart',
  components: {
    NavBar,
    Footer
  }
}
</script>
<style>

</style>
