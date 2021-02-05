import coming from 'Assets/coming.png';

export default function Home() {
  return (
    <div>
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={coming}
        alt='coming'
      />
    </div>
  );
}
