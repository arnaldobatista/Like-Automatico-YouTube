// ==UserScript==
// @name         Like Automático e Download - YouTube
// @homepageURL
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Script para curtir automaticamente vídeos do Youtube e add botão de dowload
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
    // like automatico
    const like = () => {
        const interval = setInterval(() => {
            const btnLike = document.querySelector('ytd-toggle-button-renderer > yt-button-shape > button')
            const btnDesLike = document.querySelector('ytd-segmented-like-dislike-button-renderer > div:nth-child(2) > ytd-toggle-button-renderer > yt-button-shape > button')

            if (btnLike) {
                if (btnDesLike.getAttribute("aria-pressed") == btnLike.getAttribute("aria-pressed")) {
                    btnLike.click()
                    clearInterval(interval)
                    return
                } else {
                    clearInterval(interval)
                    return
                }
            }
        }, 1000)
    }
    // fim - like automatico

    // btn download
    const downloadButton = document.createElement('tp-yt-paper-button')
    downloadButton.textContent = 'Download'
    downloadButton.classList.add('yt-spec-button-shape-next')
    downloadButton.classList.add('yt-spec-button-shape-next--tonal')
    downloadButton.classList.add('yt-spec-button-shape-next--mono')
    downloadButton.classList.add('yt-spec-button-shape-next--size-m')
    downloadButton.onclick = () => window.open(`https://www.ssyoutube.com/watch?v=${new URL(window.location).searchParams.get("v")}`, '_blank')

    const waitForElement = (selector, callback) => {
        const element = document.querySelector(selector)
        if (element) return callback(element)
        return window.requestAnimationFrame(() => waitForElement(selector, callback))
    }

    const styleMarginLeftDownload = setInterval(() => {
        const subscription = document.querySelector('ytd-subscribe-button-renderer > yt-button-shape > button > div > span').innerHTML
        if (subscription === 'Inscrever-se') {
            document.querySelector('ytd-subscribe-button-renderer > tp-yt-paper-button:nth-child(5)').setAttribute('style', 'margin-left: 10px;')
        } if (subscription === 'Inscrito') {
            document.querySelector('ytd-subscribe-button-renderer > tp-yt-paper-button:nth-child(5)').setAttribute('style')
        }
    }, 1000)
    // fim - btn download

    // remover btn download YT premium
    setInterval(() => {
        if (document.querySelector('ytd-download-button-renderer')) {
            const trueDownaload = document.querySelector('ytd-download-button-renderer')
            if (trueDownaload.parentNode) {
                trueDownaload.parentNode.removeChild(trueDownaload)
                clearInterval()
            }
        }
    }, 1000)
    // fim - remover btn download YT premium

    if (window.location.pathname == '/watch') {
        setInterval(() => like(), 2000)
        waitForElement('ytd-subscribe-button-renderer', target => target.appendChild(downloadButton))
        styleMarginLeftDownload()
    }
})()
