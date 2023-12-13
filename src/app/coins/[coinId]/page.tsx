'use client';

export default function Page({ params }: { params: {coinId: string}}) {
    return <div>My Post: {params.coinId}</div>
  }