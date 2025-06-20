
let currentRoom = null;

async function openChat(roomId) {
  currentRoom = roomId;
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });

  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  data.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'chat-bubble';
    div.innerText = msg.sender_id + ": " + msg.message_text;
    chatBox.appendChild(div);
  });
}

async function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value;
  const user = await supabase.auth.getUser();
  if (!user.data.user) return alert('Not logged in');

  await supabase.from('messages').insert([{
    sender_id: user.data.user.id,
    message_text: text,
    room_id: currentRoom
  }]);

  input.value = '';
  openChat(currentRoom);
}
