const platforms = [
  {
    name: "Codeforces",
    color: "text-cf-blue"
  },
  {
    name: "LeetCode",
    color: "text-lc-orange"
  },
  {
    name: "AtCoder",
    color: "text-ac-teal"
  },
  {
    name: "CodeChef",
    color: "text-cc-brown"
  },
]

export function SocialProof() {
  return (
    <section className="py-10 border-y border-border bg-surface-1/50">
         <div className="px-6 md:px-8 flex flex-col items-center">
           <p className="text-xs font-medium uppercase tracking-widest text-text-muted mb-6">
             Trusted by 500+ competitive programmers
           </p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
             {platforms.map((p) => (
               <div key={p.name} className={`text-lg md:text-xl font-bold ${p.color}`}>{p.name}</div>
             ))}
           </div>
         </div>
       </section>
  )
}
