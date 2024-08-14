const MessagePage = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className='w-6/12 m-auto bg-white shadow-md rounded-lg'>
                <div className='w-full p-4 bg-green-200 rounded-t-lg'>
                    <h1 className='font-bold text-2xl'>
                        Selamat, Pendaftaran berhasil...
                    </h1>
                    <h1 className='font-medium text-lg'>Kami akan mengirimkan invoice dan informasi lebih lanjut ke no whatsApp Kamu</h1>
                </div>
                <div className='p-4 bg-orange-100 rounded-b-lg'>
                    <h1 className='font-medium'>Hati-hati penipuan! jangan menerima tagihan selain dari no berikut</h1>
                    <h1 className='font-medium'>Admin 1 : +6285271726006</h1>
                    <h1 className='font-medium'>Admin 2 : +6287739342149</h1>
                    <h1 className='font-medium'>Admin 3 : +6289514268527</h1>
                    <h1 className='font-medium'>Admin 4 : +6285974857383</h1>
                    <h1 className='font-medium'>Admin 5 : +6281912883149</h1>
                    <h1 className='font-medium'>Admin 6 : +6287821594060</h1>
                    <h1 className='font-medium'>Telepon : (0274)2250131</h1>
                    <h1 className='font-medium'>Kami tidak bertanggung jawab atas tagihan yang dikirimkan selain no diatas</h1>
                    <h1 className='font-medium'>Terima Kasih</h1>
                </div>
                
            </div>
        </div>
    )
}

export default MessagePage