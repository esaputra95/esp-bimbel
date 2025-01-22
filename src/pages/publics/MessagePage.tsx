const MessagePage = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className='w-full xl:w-6/12 md:w-6/12 lg:w-6/12 m-auto bg-white shadow-md rounded-lg'>
                <div className='w-full p-4 bg-green-200 rounded-t-lg'>
                    <h1 className='font-bold text-2xl'>
                    Selamat pendaftaran yang kamu lakukan berhasil.
                    </h1>
                    <h1 className='font-medium text-lg'>Tim kami akan mengirimkan invoice dan informasi lebih lanjut melalui WhatsApp. Terimakasih</h1>
                </div>
            </div>
        </div>
    )
}

export default MessagePage