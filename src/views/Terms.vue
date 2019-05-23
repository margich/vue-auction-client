<template>
    <div>
        <NavBar />
            <div class="container">
                <div class="row mt-4">
                    <div class="col-12">
                        <h2 style="color:#1C82C2;">Terms</h2>
                        <hr>
                        <p>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Neque hic dolore voluptatem deleniti
                            quae quidem ipsam illum ex facere tenetur? Vitae non earum
                            voluptate iure libero perferendis fuga magni rerum.
                        </p>
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
  name: 'Terms',
  components: {
    NavBar,
    Footer
  }
}
</script>
