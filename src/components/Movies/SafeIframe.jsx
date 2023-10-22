export default function SafeIframe({videoKey, title, url}) {
    return (
      <div>
        <iframe
          title={title}
          src={url}
          frameBorder={0}
          allowFullScreen
          className="aspect-video w-full h-full rounded-[10px]"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    )
}