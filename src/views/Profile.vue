<template>
    <Starfield />

    <Dashboard>
        <template #left-content>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Profile Page</title>

                <!-- Custom Css -->
                <link rel="stylesheet" href="style.css">

                <!-- FontAwesome 5 -->
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
            </head>

            <body>
                <!-- Navbar top -->
                <div class="navbar-top">
                    <div class="title">
                        <h1>Profile</h1>
                    </div>

                    <!-- Navbar -->
                    <ul>
                        <li>
                            <a href="#message">
                                <span class="icon-count">29</span>
                                <i class="fa fa-envelope fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#notification">
                                <span class="icon-count">59</span>
                                <i class="fa fa-bell fa-2x"></i>
                            </a>
                        </li>
                    </ul>
                    <!-- End -->
                </div>
                <!-- End -->

                <!-- Main -->
                <div class="main">
                    <h2>IDENTITY</h2>
                    <div class="card">
                        <div class="card-body">
                            <i class="fa fa-pen fa-xs edit"></i>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>:</td>
                                        <td>ImDezCode</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>:</td>
                                        <td>imdezcode@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>:</td>
                                        <td>Bali, Indonesia</td>
                                    </tr>
                                    <tr>
                                        <td>Hobbies</td>
                                        <td>:</td>
                                        <td>Diving, Reading Book</td>
                                    </tr>
                                    <tr>
                                        <td>Job</td>
                                        <td>:</td>
                                        <td>Web Developer</td>
                                    </tr>
                                    <tr>
                                        <td>Skill</td>
                                        <td>:</td>
                                        <td>PHP, HTML, CSS, Java</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- End -->
            </body>

            </html>
        </template>
    </Dashboard>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Dancing+Script);

* {
    margin: 0;
}

body {
    font-family: Arial;
    overflow: hidden;
}

/* NavbarTop */
.navbar-top {
    color: #333;
    box-shadow: 0px 4px 8px 0px grey;
    height: 70px;
}

.title {
    font-family: 'Dancing Script', cursive;
    padding-top: 15px;
    position: absolute;
    color: #fff;
}

.navbar-top ul {
    float: right;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 18px 50px 0 40px;
}

.navbar-top ul li {
    float: left;
}

.navbar-top ul li a {
    color: #333;
    padding: 14px 16px;
    text-align: center;
    text-decoration: none;
}

.icon-count {
    background-color: #ff0000;
    color: #fff;
    float: right;
    font-size: 11px;
    left: -25px;
    padding: 2px;
    position: relative;
}

/* End */

/* Main */
.main {
    margin-top: 2%;
    margin-left: 29%;
    font-size: 28px;
    padding: 0 10px;
    width: 58%;
}

.main h2 {
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 24px;
    margin-bottom: 10px;
}

.main .card {
    border-radius: 18px;
    box-shadow: 1px 1px 8px 0 grey;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
}

.main .card table {
    border: none;
    font-size: 16px;
    height: 270px;
    width: 80%;
}

.edit {
    position: absolute;
    right: 14%;
}

/* End */
</style>

<script setup>
import Dashboard from '@/components/Dashboard.vue';
import Starfield from '@/components/Starfield.vue';
</script>