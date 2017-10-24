export const getSettings = ({
    commit
  }) => axios
  .get('/api/v1/admin/settings')
  .then((response) => {
    commit('setSettings', response.data.data)
  })
