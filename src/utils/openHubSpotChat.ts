const openHubSpotChat = () => {
  const w = window as any;

  if (w.HubSpotConversations) {
    w.HubSpotConversations.widget.open();
  } else {
    w.hsConversationsOnReady = [
      () => {
        w.HubSpotConversations.widget.open();
      },
    ];
  }
};

export default openHubSpotChat;
