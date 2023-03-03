// ==UserScript==
// @name         Like Automático e Download - YouTube
// @homepageURL
// @namespace    http://tampermonkey.net/
// @version      6.0.0
// @description  Script para curtir automaticamente vídeos do Youtube e add botão de dowload
// @license MIT
// @icon https://logospng.org/download/facebook-like/logo-facebook-like-1536.png
// @author       Arnaldo Batista
// @copyright 2022, Arnaldo Batista (https://github.com/arnaldbatista)
// @match        https://www.youtube.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict'
    // like automatico
    const like = () => {
        let btnLike = document.querySelector('ytd-segmented-like-dislike-button-renderer > div:nth-child(1) > ytd-toggle-button-renderer > yt-button-shape > button')
        let btnDesLike = document.querySelector('ytd-segmented-like-dislike-button-renderer > div:nth-child(2) > ytd-toggle-button-renderer > yt-button-shape > button')

        if (btnLike) {
            if (btnDesLike.getAttribute("aria-pressed") == btnLike.getAttribute("aria-pressed")) {
                btnLike.click()
                return
            } else {
                return
            }
        }
    }
    // fim - like automatico

    // btn download
    const downloadButton = document.createElement('tp-yt-paper-button')
    downloadButton.textContent = 'Download'
    downloadButton.classList.add('yt-spec-button-shape-next')
    downloadButton.classList.add('yt-spec-button-shape-next--tonal')
    downloadButton.classList.add('yt-spec-button-shape-next--mono')
    downloadButton.classList.add('yt-spec-button-shape-next--size-m')
    downloadButton.onclick = () => {
        const url = new URL(window.location)
        const options = {
            method: 'POST',
            body: JSON.stringify({ url: url }),
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('https://ssyoutube.online/wp-json/aio-dl/video-data/', options)
            .then((response) => response.json())
            .then((data) => {
                // Filtrar somente URLs com extensão MP4
                const mp4Video = data.medias.filter(video => video.extension === "mp4");
                // Ordenar por resolução
                mp4Video.sort((a, b) => {
                    const resolutionA = parseInt(a.quality.match(/\d+/));
                    const resolutionB = parseInt(b.quality.match(/\d+/));
                    return resolutionB - resolutionA;
                });
                // Abrir a URL
                window.open(mp4Video[1].url);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const waitForElement = (selector, callback) => {
        const element = document.querySelector(selector)
        if (element) return callback(element)
        return window.requestAnimationFrame(() => waitForElement(selector, callback))
    }

    const styleMarginLeftDownload = () => {
        document.querySelector('ytd-subscribe-button-renderer > tp-yt-paper-button:nth-child(5)').setAttribute('style', 'margin-left: 8px;')
    }
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

    setInterval(() => {
        if (window.location.pathname == '/watch') { // ok
            like()
            waitForElement('ytd-subscribe-button-renderer', target => target.appendChild(downloadButton))
            styleMarginLeftDownload()
        }
    }, 1000)
})()
