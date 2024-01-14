'use client';

export default function CoinPage({ params }: { params: {coinId: string}}) {
    return <div>My Post: {params.coinId}</div>
  }