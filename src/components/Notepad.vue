<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const newNote = ref('');
const notes = ref([]);
const router = useRouter();

const token = localStorage.getItem('token');
if (!token) {
  router.push('/login');
}

const addNote = async () => {
  if (newNote.value.trim()) {
    const note = {
      id: Date.now(),
      content: newNote.value,
    };
    await axios.post('http://localhost:3000/notes', note, {
      headers: {
        Authorization: token,
      },
    });
    notes.value.push(note);
    newNote.value = '';
  }
};
</script>
