import axios from 'axios'

export const postImage = (image: string) => {
  const fmData = new FormData()
  fmData.append('image', image)
  return axios.post('/api/validate-face', fmData)
}
