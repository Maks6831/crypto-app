'use client';

export default function Page({ params }: { params: {coinId: string}}) {
    return <div style={{maxWidth: '1300px'}} className="border-2 h-screen flex p-1">
      <div className="border-2 flex w-full p-3 ">
        <div className="border-2 w-5/12 m-2 h-1/2">
          <div>Card Component</div>
        </div>
        <div className="border-2 w-7/12 m-2 h-1/2 flex flex-col justify-between">
          <div>Text</div>
          <div>url container</div>
        </div>
      </div>
      
    </div>
  }