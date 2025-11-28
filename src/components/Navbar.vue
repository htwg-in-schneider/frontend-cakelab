<script setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg fixed-top shadow-sm">
        <div class="container d-flex justify-content-between align-items-center">
            <router-link class="navbar-brand" to="/">
                <img src="/src/assets/Images/Logo_schmal.png" alt="CakeLab Logo" class="logo-img">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item mx-3">
                        <router-link class="nav-link" to="/standard-cakes">Standard Cake</router-link>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link class="nav-link" to="/customize-cake">Customize Cake</router-link>
                    </li>
                    <li class="nav-item mx-3"><a class="nav-link" href="#">About us</a></li>
                    <li class="nav-item ms-3">
                        <a href="#">
                            <router-link to="/login">
                                <img src="/src/assets/images/account_image.png" alt="Account" class="icon-img">
                            </router-link>
                        </a>
                    </li>
                    <li class="nav-item ms-3">
                        <a href="#"><img src="/src/assets/images/warenkorb_image.png" alt="Cart" class="icon-img"></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
    background-color: var(--zweitfarbe);
    padding-left: 0;
    padding-right: 0;
}

.navbar .container {
    max-width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
}

.navbar-brand {
    margin-right: auto;
}

.navbar-collapse {
    justify-content: flex-end;
}

.navbar .nav-link {
    color: var(--black);
    font-weight: 600;
}

.navbar .nav-link:hover {
    text-decoration: underline;
}

.logo-img {
    width: 140px;
}

.icon-img {
    height: 35px;
}
</style>