// ==UserScript==
// @name         Like Automático - YouTube
// @homepageURL
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Script para curtir automaticamente vídeos do Youtube
// @license MIT
// @icon https://logospng.org/download/facebook-like/logo-facebook-like-1536.png
// @author       Arnaldo Carpi
// @copyright 2022, Arnaldo Carpi (https://github.com/arnaldocarpi)
// @match        https://www.youtube.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict'
    const like = () => {
        const interval = setInterval(() => {
            const btnlike = document.querySelector('#top-level-buttons-computed > ytd-toggle-button-renderer:nth-child(1)')
            if (btnlike) {
                clearInterval(interval)
                if (!btnlike.classList.contains('style-default-active')) {
                    btnlike.click()
                }
            }
        }, 1000)
    }
    document.body.addEventListener('yt-navigate-finish', function (event) {
        if (window.location.pathname == '/watch') {
            console.log(window.location.href)
            console.log(window.location.pathname)
            like()
        }
    })
})()