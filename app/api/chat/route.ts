import { sleep } from "@/common/util";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest, } from "next/server";

export async function POST(request: NextRequest) {
    // 把请求参数转化为定义的参数类型
    const { messages } = (await request.json()) as MessageRequestBody
    const encoder = new TextEncoder()
    // 使用数据流返回消息模拟逐字返回
    const stream = new ReadableStream({
        async start(controller) {
            // 提取消息列表，返回消息列表中最后一条消息的内容
            const messageText = messages[messages.length - 1].content
            for (let i = 0; i < messageText.length; i++) {
                await sleep(100)
                controller.enqueue(encoder.encode(messageText[i]))
            }
            controller.close()
        }
    })
    return new Response(stream)
}