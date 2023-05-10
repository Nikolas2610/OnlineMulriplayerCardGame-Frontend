<template>
    <div class="text-xl mb-6 text-center italic">
        How to play the game and how to use your tools
    </div>
    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8" viewBox="0 0 16 16">
            <path
                d="M8.5.069A15.328 15.328 0 0 0 7 0c-.593 0-1.104.157-1.527.463-.418.302-.717.726-.93 1.208-.386.873-.522 2.01-.54 3.206l4.497 1V.069zM3.71 5.836 3.381 6A2.5 2.5 0 0 0 2 8.236v2.576C2 13.659 4.22 16 7 16h2c2.78 0 5-2.342 5-5.188V8.123l-9-2v.003l.008.353c.007.3.023.715.053 1.175.063.937.186 2.005.413 2.688a.5.5 0 1 1-.948.316c-.273-.817-.4-2-.462-2.937A30.16 30.16 0 0 1 4 6.003c0-.034.003-.067.01-.1l-.3-.067zM14 7.1V5.187c0-1.13-.272-2.044-.748-2.772-.474-.726-1.13-1.235-1.849-1.59A7.495 7.495 0 0 0 9.5.212v5.887l4.5 1z" />
        </svg>
        You can move a card with your mouse
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8" viewBox="0 0 16 16">
            <path
                d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
        You can chat with other players to the room
    </InfoIconItem>
    <InfoIconItem>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8 h-8" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
        </svg>
        <div>
            You can move the player tools anywhere to the screen
        </div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8" viewBox="0 0 16 16">
            <path
                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
            <path
                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
        </svg>
        <div> You can hide a card from other players</div>
    </InfoIconItem>
    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 " viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
        <div> You can show a card to other players</div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 " viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
        </svg>
        <div> You can rotate a card to the right</div>
    </InfoIconItem>
    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 " viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
        </svg>
        <div>You can rotate a card to the left</div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8 transition duration-300" viewBox="0 0 16 16">
            <path
                d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path
                d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
        </svg>
        <div>The icon show that user is playing. If you click the icon you will end your turn and won't be able to move a
            card</div>
    </InfoIconItem>

    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8 transition duration-300" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
        <div> You can set your turn to be able to move a card</div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8 transition duration-300" viewBox="0 0 16 16">
            <path
                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
        </svg>
        <div>You can choose a status from the available custom status</div>
    </InfoIconItem>

    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8 transition duration-300" viewBox="0 0 16 16">
            <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
        </svg>
        <div>You can see the points that have all the players at the table</div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 group-hover:text-dark" viewBox="0 0 16 16">
            <path
                d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z" />
        </svg>
        <div> You can get all the cards from a chosen deck</div>
    </InfoIconItem>

    <InfoIconItem>
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 group-hover:text-dark" viewBox="0 0 56 56">
            <path
                d="M57.832,26.926l-8-12c-0.186-0.278-0.498-0.445-0.832-0.445H9c-0.335,0-0.646,0.167-0.832,0.445l-8,12
        		c-0.205,0.307-0.224,0.701-0.05,1.026C0.292,28.278,0.631,28.481,1,28.481h6v15.038h2V28.481h5v6h2v-6h27v6h2v-6h5v15.038h2V28.481
        		h5c0.369,0,0.708-0.203,0.882-0.528C58.056,27.627,58.037,27.233,57.832,26.926z M2.869,26.481l6.666-10h38.93l6.667,10H2.869z" />
        </svg>
        <div> You can move all the cards from the table to a chosen deck</div>
    </InfoIconItem>
    <InfoIconItem :reverse="true">
        <svg fill="currentColor" class="w-8 h-8 transition duration-300 group-hover:text-dark" viewBox="0 0 16 16">
            <path
                d="M11.5 12.5a3.493 3.493 0 0 1-2.684-1.254 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907 3.5 3.5 0 1 1-2.538-5.743 3.5 3.5 0 1 1 6.708 0A3.5 3.5 0 1 1 11.5 12.5z" />
        </svg>
        <div> You can give a card to other player straight to his hand</div>
    </InfoIconItem>
    <InfoIconItem>
        <img :src="showCard" class="w-20 h-32">
        When the card in your hand is without eye, the card is hidden to other players
    </InfoIconItem>
    <InfoIconItem>
        <img :src="hiddenCard" class="w-20 h-32">
        When the card in your hand has the eye, the card is visible to other players
    </InfoIconItem>
    <InfoIconItem>
        <img :src="hiddenCardTable" class="w-20 h-32">
        When the card has this image, the card is hidden from all player to the table
    </InfoIconItem>
    <InfoIconItem>
        <img :src="notPlaying" class="w-80">
        Player tools. When the background is black the player is waiting for his turn
    </InfoIconItem>
    <InfoIconItem>
        <img :src="playing" class="w-80">
        Player tools. When the background is green the player is playing
    </InfoIconItem>
</template>

<script setup lang="ts">
import InfoIconItem from '@/components/online-table/info/InfoIconItem.vue';
import playing from '@/assets/images/info/player-playing.png'
import notPlaying from '@/assets/images/info/player-not-playing.png'
import hiddenCard from '@/assets/images/info/hidden-card.png'
import hiddenCardTable from '@/assets/images/info/hidden-card-table.png'
import showCard from '@/assets/images/info/show-card.png'
</script>