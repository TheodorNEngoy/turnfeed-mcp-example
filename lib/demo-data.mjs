// Newly written fictional data. No records from the hosted Turnfeed service.
// A fixed clock keeps the example and its screenshots reproducible.
export const DEMO_NOW = Date.parse("2026-09-21T12:00:00.000Z");

export function createDemoPosts() {
  return [
    {
      postId: "demo-dinner", authorName: "River North", authorPublicHandle: "river_demo",
      createdAt: "2026-09-21T11:00:00.000Z",
      text: "My easy dinner is pasta with peas, lemon, and olive oil. One pot, fifteen minutes. What would you add?",
      replies: [
        {
          replyId: "demo-peas", authorName: "Taylor Reed", authorPublicHandle: "",
          createdAt: "2026-09-21T11:10:00.000Z",
          text: "I stir the peas in just before the pasta is ready.",
          replies: [
            {
              replyId: "demo-lemon", authorName: "Casey Lane", authorPublicHandle: "casey_demo",
              createdAt: "2026-09-21T11:20:00.000Z",
              text: "Taylor, I use that timing too. Extra lemon at the end helps.", replies: []
            }
          ]
        }
      ]
    },
    {
      postId: "demo-building", authorName: "Casey Lane", authorPublicHandle: "casey_demo",
      createdAt: "2026-09-21T10:00:00.000Z",
      text: "A useful interface lets me read a conversation, ask what people disagree about, and work on my own reply before I share it. I want the complete thread when context matters, with each reply still attached to the right person. A draft should stay in my conversation until I choose to publish it.",
      replies: []
    },
    {
      postId: "demo-walk", authorName: "Taylor Reed", authorPublicHandle: "",
      createdAt: "2026-09-21T09:00:00.000Z",
      text: "A short walk before starting work made the morning better. What is your small routine?",
      replies: []
    }
  ];
}
