import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useChat } from "../hooks/useChat"


const conversations = [
  { group: "Today", titles: ["A better morning routine", "How solar panels work"] },
  { group: "Yesterday", titles: ["Weekend in Copenhagen", "Understanding compound interest", "Notes on the new project"] },
]



const Dashboard = () => {
  const { initializeSocketConnection, handleSendMessage, handleGetChats,handleOpenChat } = useChat()

  const user = useSelector((state) => state.auth.user)

  const [activeConversation, setActiveConversation] = useState("New conversation")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [userInput, setUserInput] = useState("")
  
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  
  
  const currentChat = chats[currentChatId]

  useEffect(() => {
    initializeSocketConnection()
    handleGetChats()

  }, [initializeSocketConnection])

  const displayName = user?.username || "Your account"
  const initials = displayName.slice(0, 1).toUpperCase()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const trimmedMessage = userInput.trim()
    if(!trimmedMessage) return;

    await handleSendMessage({message: trimmedMessage, chatId: currentChatId})
    setUserInput('')
  }

  const openChat = (chatId) =>{
     handleOpenChat(chatId);
  }


  return (
    <main className="flex h-dvh w-full overflow-hidden bg-slate-950 p-0 text-slate-900 md:gap-3 md:p-3">
      {isSidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-slate-950/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-30 flex w-[min(19rem,86vw)] flex-col border-r border-slate-200 bg-neutral-900 px-4 py-5 transition-transform duration-200 md:relative md:inset-auto md:z-auto md:w-64 md:shrink-0 md:translate-x-0 md:rounded-2xl md:border md:border-slate-200/80 md:px-3 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <a className="mb-7 flex items-center gap-3 px-2" href="/" aria-label="Perplexity home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M12 3.5 14.1 9.9 20.5 12l-6.4 2.1-2.1 6.4-2.1-6.4L3.5 12l6.4-2.1L12 3.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
              <path d="m18.5 3 .6 1.9L21 5.5l-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6.6-1.9Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">Perplexity</span>
        </a>

        <button
          className="mb-7 flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
          onClick={() => {
            setActiveConversation("New conversation")
            setPrompt("")
            setIsSidebarOpen(false)
          }}
          type="button"
        >
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
          New conversation
        </button>

        <div className="flex-1 overflow-y-auto pb-4">
          {Object.values(chats).map((chat, index) => (
            <button onClick={()=>{openChat(chat.id)}}
            key={index}
            type="button"
            className="w-full rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left">
              {chat.title}
            </button>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-4">
          <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-indigo-700 bg-indigo-600 " type="button">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{initials}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-white">{displayName}</span>
              <span className="block text-xs text-white">Free plan</span>
            </span>
            <svg aria-hidden="true" className="size-4 text-white" fill="none" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </aside>

      <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-neutral-800 md:rounded-2xl md:shadow-2xl md:shadow-black/10">
        <header className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-slate-100 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              className="-ml-2 flex size-9 items-center justify-center rounded-lg text-white transition hover:bg-slate-100 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
              type="button"
            >
              <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            </button>
            <span className="truncate text-sm font-medium text-white">{activeConversation}</span>
          </div>
          <button className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3 transition hover:border-indigo-200 hover:bg-indigo-50/60" type="button">
            <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-indigo-700">{initials}</span>
            <span className="hidden max-w-32 truncate text-sm font-medium text-white sm:block">{displayName}</span>
            <svg aria-hidden="true" className="hidden size-3.5 text-amber-50 sm:block" fill="none" viewBox="0 0 24 24">
              <path d="m7 10 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.07),transparent_48%)] px-8 sm:px-8">
          <div className="  w-full  messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30 mt-2 ">
            {currentChat?.messages.map((message) => (

              <div 
              key={message.id} 
              className={`mx-w-[100%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base
               ${message.role == 'user'
                  ? 'ml-auto border border-white/100 rounded-br-none bg-white/12 text-white'
                  : 'mr-auto border border-white/50 rounded-bl-none bg-white/12  text-white'
                }`} >

                <p>{message.content}</p>
              </div>
            ))}

          </div>

          <form className="absolute bottom-0 w-full max-w-3xl pb-4 pt-3 sm:pb-6" onSubmit={handleSubmit}>
            <div className="rounded-2xl border border-slate-200 bg-neutral-900 p-3 shadow-lg shadow-slate-900/[0.06] ">
              <input
                value={userInput}
                onChange={(e) => { setUserInput(e.target.value) }}
                type="text"
                className="w-full
                h-10 border-none
                rounded-md
                outline-none
                text-white
                text-md"
                name="text"
                id="text"
                placeholder="Ask you question here..."
              />
              <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                <span className="pl-1 text-xs text-white">Press Enter to ask</span>
                <button
                  aria-label="Send question"
                  className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                  disabled={!userInput.trim()}
                  type="submit"
                >
                  <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
                    <path d="M12 19V5m0 0L6 11m6-6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-white">AI can make mistakes. Check important information.</p>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Dashboard