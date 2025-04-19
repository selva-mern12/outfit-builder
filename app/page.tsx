"use client";

import { useCallback, useState } from 'react';
import { BiSolidCart } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useDropzone } from 'react-dropzone';
import './page.css';

interface DressItem {
  name: string;
  image: string | null;
  preview?: string;
  position: string; // CSS class for positioning
}

const Home = () => {
  const [items, setItems] = useState<DressItem[]>([
    { name: 'T-Shirt', image: null, position: 'item-top' },
    { name: 'Pant', image: null, position: 'item-bottom' },
    { name: 'Shirt', image: null, position: 'item-top' },
    { name: 'One Piece', image: null, position: 'item-full' },
    { name: 'Headwear', image: null, position: 'item-head' },
    { name: 'Footwear', image: null, position: 'item-feet' },
  ]);

  const [canvasItems, setCanvasItems] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error' } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], itemName: string) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    
    setItems(prev => prev.map(item => 
      item.name === itemName 
        ? { ...item, image: file.name, preview } 
        : item
    ));

    setCanvasItems(prev => ({
      ...prev,
      [itemName]: preview
    }));
  }, []);

  const removeItem = (itemName: string) => {
    setItems(prev => prev.map(item => 
      item.name === itemName 
        ? { ...item, image: null, preview: undefined } 
        : item
    ));
    setCanvasItems(prev => {
      const updated = { ...prev };
      delete updated[itemName];
      return updated;
    });
  }

  const handleReset = () => {
    if (Object.keys(canvasItems).length === 0) {
      setMessage({text: 'Please add any dresses first', type: 'error'});
    } else {
      setItems(items.map(item => ({ ...item, image: null, preview: undefined })));
      setCanvasItems({});
      setMessage({text: 'Outfit reset successfully. Add any dresses', type: 'success'});
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSave = () => {
    if (Object.keys(canvasItems).length === 0) {
      setMessage({text: 'Please add any dresses first', type: 'error'});
    } else {
      setMessage({text: 'Outfit saved successfully', type: 'success'});
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddToCart = () => {
    if (Object.keys(canvasItems).length === 0) {
      setMessage({text: 'Please add any dresses first', type: 'error'});
    } else {
      setMessage({text: 'Product added to cart', type: 'success'});
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-container">
      <div className="outfit-builder-container">
        <h1 className="heading">Outfit Builder</h1>
        <p className="subheading">Drag & drop items to create your outfit</p>
        {message && (
          <div className={`message-banner ${message.type}`}>
            {message.text}
          </div>
        )}
        
        <div className="dress-container">
          <div className="dress-choosing-container">
            {items.map(item => (
              <Dropzone 
                key={item.name} 
                item={item} 
                onDrop={onDrop} 
                onRemove={removeItem}
              />
            ))}
          </div>
          
          <div className="canvas-area">
            <div className="canvas-header">
              <h2>CANVAS AREA</h2>
            </div>
            {Object.keys(canvasItems).length === 0 ? 
              <div className="human-silhouette-empty">
                <p className='empty-text'>Nothing here yet – let’s style something awesome!</p>
              </div> :
              <div className="human-silhouette">
                {Object.entries(canvasItems).map(([name, url]) => {
                  const item = items.find(i => i.name === name);
                  return (
                    <div key={name} className={`canvas-item ${item?.position || ''}`}>
                      <img src={url} alt={name} />
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
        
        <div className="button-container">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="button" className="btn btn-outline" onClick={handleSave}>
            Save Outfit
          </button>
          <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart <BiSolidCart className="cart-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Dropzone Component remains the same as previous implementation
const Dropzone = ({ item, onDrop, onRemove }: { item: DressItem,
                    onDrop: (files: File[], name: string) => void, 
                    onRemove: (name: string) => void }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onDrop(files, item.name),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.name);
  };

  return (
    <div {...getRootProps()} className={`image-item ${isDragActive ? 'drag-active' : ''}`}>
      <input {...getInputProps()} />
      {item.preview ? (
        <div className="preview-container">
          <img 
            src={item.preview} 
            alt={item.name} 
            className="preview-image"
          />
          <div className="preview-overlay">
            <button type='button' className='item-remove-button' onClick={handleRemove}><RxCross2 /></button>
            <span>Replace {item.name}</span>
          </div>
        </div>
      ) : (
        <div className="image-label">
          <div className="upload-icon">{isDragActive ? '↑' : '+'}</div>
          <span className="item-name">{item.name}</span>
          <span className="instruction">
            {isDragActive ? 'Drop image here' : 'Drag & drop or click'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;