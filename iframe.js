// // (function () {
// // 创建一个新的iframe元素
// const iframe = document.createElement('iframe');

// // 设置iframe的属性，例如src（来源地址）和id
// iframe.src = 'http://192.168.100.161:82/intelligenceQaPro/qaMainPage'; // 嵌入的网页地址
// iframe.allow = "fullscreen;microphone";
// iframe.title = "dify chatbot bubble window";
// iframe.id = 'myIframe';
// // iframe.width = '600'; // 设置iframe的宽度
// // iframe.height = '400'; // 设置iframe的高度
//    iframe.style.cssText = `
//         border: none; position: absolute; flex-direction: column; justify-content: space-between;
//         box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px;
//         bottom: 55px; right: 0; width: 24rem; max-width: calc(100vw - 2rem); height: 40rem;
//         max-height: calc(100vh - 6rem); border-radius: 0.75rem; display: flex; z-index: 2147483647;
//         overflow: hidden; left: unset; background-color: #F3F4F6;user-select: none;
//       `;
// // 在 iframe 内部
// document.getElementById('someButton').addEventListener('click', function(event) {
//     window.parent.postMessage({
//         type: 'typeA',
//         payload: { /* ... */ },
//         triggeredBy: 'click' // 标识这是由点击事件触发的消息
//     }, '*');
// });
// const loadJson ={
//   isIframeShow:false
// }
// // 或者在其他逻辑中，比如页面加载时
// window.onload = function() {
//     window.parent.postMessage({
//         type: 'typeB',
//         payload: { isIframeShow:false },
//         triggeredBy: 'load' // 标识这是页面加载时触发的消息
//     }, '*');
// };
 
// // 将iframe添加到DOM中，例如添加到body元素中
// document.body.appendChild(iframe);
// // })
  const configKey = "difyChatbotConfig";
  const buttonId = "dify-chatbot-bubble-button";
  const iframeId = "myIframeId";
function createIframe(id,src) {
  const iframe = document.createElement('iframe');
  iframe.src = src;
 iframe.id = id;
  // iframe.style.border = 'none';
   iframe.style.cssText = `
        border: none; position: absolute; flex-direction: column; justify-content: space-between;
        box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px;
        bottom: 55px; right: 0; width: 24rem; max-width: calc(100vw - 2rem); height: 40rem;
        max-height: calc(100vh - 6rem); border-radius: 0.75rem; display: flex; z-index: 2147483647;
        overflow: hidden; left: unset; background-color: #F3F4F6;user-select: none;
      `;
  // 添加 onload 事件监听器，确保在 iframe 加载完成后执行后续操作
  iframe.onload = function() {
    console.log('Iframe has been loaded.');
    window.parent.postMessage({
        type: 'typeB',
        payload: { isIframeShow:false },
        triggeredBy: 'load' // 标识这是页面加载时触发的消息
    }, '*');
  };

  document.body.appendChild(iframe);
  return iframe;
}


class IframeCommunicator {
          constructor(iframeId, targetOrigin = '*') {
            this.iframe = document.getElementById(iframeId);
            this.targetOrigin = targetOrigin;
            window.addEventListener('message', this._onMessage.bind(this), false);
        }

        _onMessage(event) {
            if (event.origin !== this.targetOrigin && this.targetOrigin !== '*') return;
            console.log('Message received from:', event.origin);
            console.log('Message data:', event.data);
            // 根据收到的消息执行相应的处理
            if (typeof this.messageCallback === 'function') {
                this.messageCallback(event.data, event.origin);
            }
        }

        sendMessage(message) {
            if (this.iframe && this.iframe.contentWindow) {
                this.iframe.contentWindow.postMessage(message, this.targetOrigin);
            } else {
                console.error('Iframe not ready or does not exist.');
            }
        }

        onMessage(callback) {
            this.messageCallback = callback;
        }
}
// 创建 iframe 并指定其来源
const myIframe = createIframe(iframeId,'http://192.168.100.161/intelligenceQaPro/qaMainPage');
 // 使用IframeCommunicator与iframe通信
const communicator = new IframeCommunicator(iframeId, 'http://192.168.100.161/intelligenceQaPro/qaMainPage'); // 替换为目标origin

