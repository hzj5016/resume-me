!function () {
    let model = {
        //获取数据
        fetch: function () {
            let query = new AV.Query('Message');
            return query.find() //返回Promise对象
        },
        //创建并保存数据
        save: function (name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({ //返回Promise对象
                'name': name,
                'content': content
            })
        }
    }
    let view = document.querySelector('section.message')
    let controller = {
        model: null,
        view: null,
        messageList: null,
        init: function (view, model) {
            this.model = model
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMessageForm')
            this.initAv()
            this.loadMessages()
            this.bindEvents()
        },
        initAv: function () {
            let APP_ID = '4HnDM3exQgz0UydRDK6tChSi-gzGzoHsz'
            let APP_KEY = 'T0C5QgRcybTSFbYTq6LYEu6l'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        loadMessages: function () {
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name} : ${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessages()
            })
        },
        saveMessages: function () {
            let myForm = this.form
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            this.model.save(name, content).then(function (object) {
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name} : ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=name]').value = null
                myForm.querySelector('input[name=content]').value = null
            })
        }
    }
    controller.init(view, model)
}.call()





