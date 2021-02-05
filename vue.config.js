const axios = require('axios')

module.exports = {
  // 关闭eslint校验
  lintOnSave: false,
  // cli-4配置别名
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        base: '@/base',
        api: "@/api",
        views: "@/views",
        store: "@/store"
      }
    }
  },
  // 配置代理
  devServer: {
    before (app) {
      // /api/getTopBanner接口代理
      app.get('/api/getTopBanner', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const jumpPrefixMap = {
          10002: 'https://y.qq.com/n/yqq/album/',
          10014: 'https://y.qq.com/n/yqq/playlist/',
          10012: 'https://y.qq.com/n/yqq/mv/v/'
        }
        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            const slider = []
            const content = response.focus.data && response.focus.data.content
            if (content) {
              for (let i = 0; i < content.length; i++) {
                const item = content[i]
                const sliderItem = {}
                const jumpPrefix = jumpPrefixMap[item.type || 10002]
                sliderItem.id = item.id
                sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
                sliderItem.picUrl = item.pic_info.url
                slider.push(sliderItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider
              }
            })
            res.json(response)
          } else {
            throw new Error(response.code | response.message)
          }
        }).catch((e) => {
          console.log(e)
        })
      })

      // /api/getDiscList接口代理
      app.get('/api/getDiscList', (req, res) => {
        const url = `https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg`
        axios.get(url, {
          headers: {
            referer: 'https://y.qq.com/',
            host: 'y.qq.com'
          },
          params: req.query
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            res.json(response)
          } else {
            throw new Error(response.code | response.message)
          }
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  },
}