import axios from '../axios/axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUrl(url);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const temp = await axios.get(`/blog/${id}`)
                if (temp) {
                    setTitle(temp.title || '');
                    setUrl(temp.url) || '';
                    setContent(temp.content || '');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            "title" : title,
            "content" : content,
            "url" : url
        }

        try {            
            await axios.put(`/update/${id}`, data);
            navigate('/');
        } catch (error) {
            console.error('Error submitting blog:', error);
        }
    };

    return (
        <div className='text-xl'>
            <form onSubmit={handleSubmit} className='flex mt-5 ml-5 flex-col gap-10'>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputtitle" className=''>Blog Title :</label>
                    </div>
                    <input
                        type="text"
                        className='w-200 h-10 border-2 indent-4'
                        value={title}
                        placeholder='Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputimage" className=''>Update Blog Image</label>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className='w-200 h-10 border-2 p-1'
                        onChange={handleImageChange}
                    />
                    {url && <img src={url} alt="Preview" className="h-40 object-left object-contain" />}
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputcontent">Blog Content :</label>
                    </div>
                    <textarea
                        className='border-2 indent-4 pt-2 w-full h-100'
                        placeholder='Content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type='submit' className='h-10 w-40 bg-stone-950 text-white rounded-md cursor-pointer'>Save</button>
            </form>
        </div>
    );
};

export default EditBlog;
