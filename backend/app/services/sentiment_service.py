import os
import json
from openai import OpenAI

print("🔧 sentiment_service.py LOADED")
print("🔧 OPENAI_API_KEY exists =", bool(os.getenv("OPENAI_API_KEY")))

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_sentiment(text: str) -> dict:
    print("\n🚀 analyze_sentiment CALLED")
    print("📝 INPUT TEXT =", text)

    try:
        print("🤖 OPENAI REQUEST START")
        print("🤖 MODEL = gpt-4.1-mini")

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are a sentiment analysis engine. "
                        "Return a sentiment score from 1 to 5 as an integer. "
                        "1 = very negative, 5 = very positive. "
                        "Respond ONLY with a JSON object like: "
                        '{"score": 3}'
                    ),
                },
                {
                    "role": "user",
                    "content": text,
                },
            ],
        )

        print("🤖 OPENAI RESPONSE OBJECT =", response)

        # output_text 안전 접근
        output_text = getattr(response, "output_text", None)
        print("🤖 output_text =", output_text)

        if not output_text:
            raise ValueError("No output_text in OpenAI response")

        content = output_text.strip()
        print("📦 PARSED TEXT =", content)

        # JSON 파싱 (eval 대신 json.loads 권장)
        data = json.loads(content)
        print("📦 JSON DATA =", data)

        score = int(data.get("score", 3))
        score = max(1, min(5, score))

        print("✅ FINAL SCORE =", score)

        return {
            "score": score,
            "source": "openai",
        }

    except Exception as e:
        print("🔥 OpenAI ERROR OCCURRED")
        print("🔥 ERROR TYPE =", type(e))
        print("🔥 ERROR DETAIL =", repr(e))

        return {
            "score": 3,
            "source": "rule-based",
        }
