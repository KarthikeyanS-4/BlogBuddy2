import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios';

const Blogs = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/display');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },); 

    const handleBlogClick = (index) => {
        navigate(`/blog/${index}`);
    };

    const onDeleted = async (id) => {
        try {
            await axios.delete(`/delete/${id}`);
            const res = await axios.get('/display');
            // setData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {
                data.length === 0 ? (
                    <p className='text-2xl w-full text-center'>No blogs added yet.</p>
                ) : (
                    <div className='grid m-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {data.map((item, index) => (
                            <div key={item.id} className='p-3 border-2 rounded-lg cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:border-gray-500'>
                                <img src={`data:image/*;base64,${item.image}`} alt="Blog" className='h-40 w-full object-cover mb-4' onClick={() => handleBlogClick(item.id)} />
                                <div onClick={() => handleBlogClick(index)}>
                                    <p className='font-bold text-2xl mb-2 text-gray-500 uppercase'>{item.title}</p>
                                    <p className='text-gray-600'>{item.content.substring(0, 100)}...</p>
                                </div>
                                <button onClick={() => onDeleted(item.id)} className='mt-4 bg-red-500 text-white p-2 rounded cursor-pointer hover:scale-110'>Delete</button>
                            </div>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default Blogs;