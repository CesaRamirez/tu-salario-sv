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

export const updateSetting = ({
  dispatch
}, {
  payload,
  context,
  id
}) => {
  return new Promise((resolve, reject) => {
    axios.put('/api/v1/admin/settings/' + id, payload)
      .then((response) => {
        resolve(response.data)
        dispatch('noti', {
          message: '¡Los Datos se han actualizado con Exito!',
          type: 'success'
        }, {
          root: true
        })
      }).catch((error) => {
        context.errors = error.response.data.errors;
        reject(error.response.data.errors)
      })
  });
};
