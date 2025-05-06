<template>
    <nav class="navbar">
        <span class="navbar-brand">
            <span class="navbar-item">
                edinfo
            </span>
        </span>
        <span class="navbar-start">
            <NuxtLink class="navbar-item" to="/">
                トップページ
            </NuxtLink>
        </span>
        <span class="navbar-end">
            <span class="buttons">
                <a class="navbar-item button" href="https://github.com/oageo/emergency-dispatch">
                    出典
                </a>
                <span class="navbar-item button primary" onclick="window.location.reload(true);">
                    更新
                </span>
            </span>
        </span>
    </nav>
</template>