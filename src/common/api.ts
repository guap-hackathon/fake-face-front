import axios from 'axios'

export const postImage = (image: string) => axios.post('/api/validate-face', { image })
