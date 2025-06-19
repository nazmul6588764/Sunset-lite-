async function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value;
  const user = JSON.parse(localStorage.getItem("sunset_user"));
  await supabase.from("messages").insert([{ text, room_id: "general", sender: user.email }]);
  input.value = "";
}
supabase.channel('public:messages')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, payload => {
    const msg = payload.new;
    document.getElementById("messages").innerHTML += `<div><b>${msg.sender}:</b> ${msg.text}</div>`;
  }).subscribe();