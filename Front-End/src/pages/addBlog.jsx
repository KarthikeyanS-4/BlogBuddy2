import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios/axios';

function AddBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [author, setAuthor] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Store actual file object
            const url = URL.createObjectURL(file);
            setUrl(url);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // console.log("tile", title);
        // console.log("content", content);
        // console.log("au", author);
        // console.log("img", image);
        // formData.append('title', title);
        // formData.append('content', content);
        // formData.append('author', author);
        formData.append('image', image);
        const queryParams = new URLSearchParams({
            title: title,
            author: author,
            content: content,
        }).toString();
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        // console.log(formData);
        try {
            console.log("he;;");
            
            await axios.post(`/add?${queryParams}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/'); // Uncomment to navigate after submission
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
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputimage" className=''>Upload Blog Image</label>
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
                        <label htmlFor="inputauthor" className=''>Author Name :</label>
                    </div>
                    <input type="text" className='w-200 h-10 border-2 indent-4' value={author} placeholder='Author' onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="inputcontent" className=''>Blog Content :</label>
                    </div>
                    <textarea name="" id="" className='border-2 indent-4 pt-2 w-4xl h-100' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type='submit' className='h-10 w-40 bg-stone-950 text-white rounded-md cursor-pointer'>{id ? 'Update' : 'Publish'}</button>
            </form>
        </div>
    )
}

export default AddBlog;