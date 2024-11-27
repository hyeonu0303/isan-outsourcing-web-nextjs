

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        // admin-login 이벤트 트리거
        window.dispatchEvent(new Event("admin-login"));

        // 관리자 페이지로 이동
        router.push("/");
      } else {
        setError(data.message || "코드가 잘못되었습니다.");
      }
    } catch (err) {
      setError("오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="관리자 코드를 입력하세요"
      />
      <button type="submit">로그인</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
