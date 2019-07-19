<template>

<div class="page-title"> 
    <span>
        <h4>{{msg}}</h4>
    </span>
</div>
 
</template>

<script>

export default {
    'name': 'PageTitle',
    props: ['msg']
}

</script>

<style>

.page-title {
    padding-bottom: 10px;
}
</style>
