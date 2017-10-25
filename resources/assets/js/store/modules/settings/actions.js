export const getSettings = ({
    commit
  }) => axios
  .get('/api/v1/admin/settings')
  .then((response) => {
    commit('setSettings', response.data.data)
  })

export const getSetting = ({
    commit
  }, {
    id
  }) => axios
  .get('/api/v1/admin/settings/' + id)
  .then((response) => {
    commit('setSetting', response.data.data)
  })
