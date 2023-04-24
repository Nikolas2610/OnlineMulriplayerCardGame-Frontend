<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/UserStore';
import { setOfflineSocketUser } from '@/utils/sockets/helpers';
import { onBeforeMount } from 'vue'

const userStore = useUserStore();

onBeforeMount(async () => {
    const userId = await userStore.logout();
    if (userId) {
        setOfflineSocketUser(userId);
    }
    router.push({ name: 'login' })
})
</script>