const Footer = () => {
    return (
        <footer className="sticky bottom-0 py-6 bg-zinc-50">
    <div className="max-w-7xl mx-auto px-3">
        <div className="flex justify-center items-center">
            <p>
                This is an example app that uses feature flags from <a href="https://fflag-ms.com/service/publicFlags/ce7b67a09ce057596c934053da6027b5678fe336fc89fd6eb4fcdab6681eaf73">a CDN</a>. <br />
                All flags are managed using <a href="https://rapidapi.com/mythu.s2000/api/feature-flags2/details">FFlag-MS</a>, which is a freemium service hosted by RapidAPI. FFlag-MS also provides <a href="https://fflag-ms.com">a free web interface</a> to manage flags.
            </p>
        </div>
    </div>
        </footer >
    )
}

export default Footer
