import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Schedule from './components/Schedule'
import Speakers from './components/Speakers'
import Panels from './components/Panels'
import Sessions from './components/Sessions'
import Workshops from './components/Workshops'
import Committee from './components/Committee'
import Footer from './components/Footer'
import { conference, committee, gallery, speakers, panels, sessions, workshops } from './data'

export default function App() {
  const { data: conf, content: confBody } = conference
  const { data: comm } = committee

  return (
    <>
      <Nav conf={conf} />
      <main>
        <Hero conf={conf} />
        <About conf={conf} body={confBody} photos={gallery.data.photos ?? []} />
        <Schedule conf={conf} />
        <Speakers speakers={speakers} />
        <Panels panels={panels} />
        <Sessions sessions={sessions} />
        <Workshops workshops={workshops} />
        <Committee groups={comm.groups ?? []} thanks={comm.thanks ?? []} thanksPeople={comm.thanks_people ?? []} />
      </main>
      <Footer conf={conf} />
    </>
  )
}
