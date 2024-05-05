<template>
  <div style="background-color: #868fa6; width: 100vw; padding-top: 3vh"></div>
  <div style="display: flex; flex-direction: column; align-items: center">
    <nav
      class="navbar bg-body-secondary mb-5 shadow"
      style="width: 100vw; background-color: #f0f0f0 !important"
    >
      <div class="container-fluid">
        <a class="navbar-brand mb-0 h1 ms-3" href="/">Expense Splitter</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");
body {
  font-family: "Montserrat", sans-serif;
}
</style>
<script setup lang="ts"></script>
