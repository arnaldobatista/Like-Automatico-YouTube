// ==UserScript==
// @name         Like Automático e Download - YouTube
// @homepageURL
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Script para curtir automaticamente vídeos do Youtube e add botão de dowload
// @license MIT
// @icon https://logospng.org/download/facebook-like/logo-facebook-like-1536.png
// @author       Arnaldo Carpi
// @copyright 2022, Arnaldo Carpi (https://github.com/arnaldocarpi)
// @match        https://www.youtube.com/watch*
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
            like()
        }
    })

    let waitForElement = (selector, callback) => {
        const element = document.querySelector(selector)
        if (element) return callback(element)
        return window.requestAnimationFrame(() => waitForElement(selector, callback))
    }

    let downloadButton = document.createElement( 'tp-yt-paper-button' )
    downloadButton.textContent = 'Download'
    downloadButton.classList.add('ytd-subscribe-button-renderer')
    downloadButton.onclick = () => window.open(`https://www.ssyoutube.com/watch?v=${new URL(window.location).searchParams.get("v")}`, '_blank')

    waitForElement('ytd-subscribe-button-renderer', target => target.appendChild( downloadButton ))

    setInterval(() => {
        if(document.querySelector('ytd-download-button-renderer')){
            var trueDownaload = document.querySelector('ytd-download-button-renderer')
            if(trueDownaload.parentNode){
                trueDownaload.parentNode.removeChild(trueDownaload)
                clearInterval()
            }
        }
    }, 3000)
})()
