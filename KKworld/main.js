// main.js - 我们的全局魔法书

function showHeadsUpNotification(avatar, sender, message) {
    const notification = document.getElementById('heads-up-notification');
    if (!notification) return;

    notification.querySelector('.sender-avatar').src = avatar;
    notification.querySelector('.sender-name').textContent = sender;
    const messageContent = notification.querySelector('.message-preview');
    messageContent.textContent = ''; // 先清空旧消息

    notification.classList.add('show');

    let i = 0;
    function typeWriter() {
        if (i < message.length) {
            messageContent.textContent += message.charAt(i);
            i++;
            setTimeout(typeWriter, 60); // 每个字的间隔时间（毫秒）
        }
    }
    typeWriter();

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

function simulateIncomingMessage() {
    let conversations = JSON.parse(localStorage.getItem('conversations')) || [];

    if (conversations.length === 0) {
        alert('请先创建一个对话才能模拟接收消息！');
        return;
    }

    const targetChat = conversations[0];

    targetChat.lastMessage = "这是一条来自全局的模拟消息！";
    targetChat.time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    targetChat.unreadCount = (targetChat.unreadCount || 0) + 1; // 未读数+1

    localStorage.setItem('conversations', JSON.stringify(conversations));

    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'chat.html') {
        window.location.reload();
    } else {
        showHeadsUpNotification(targetChat.avatar, targetChat.name, targetChat.lastMessage);
    }
}