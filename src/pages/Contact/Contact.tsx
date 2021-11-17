import { HashtagIcon } from '@heroicons/react/solid';
import MyImage from '../../MyImage.jpg';
import contact from './contact.json';
import html from './html.svg';
import css from './css.svg';
import js from './js.svg';
import reactjs from './reactjs.svg';
import nodejs from './nodejs.svg';
import mongo from './mongo.svg';
import java from './java.svg';
import mysql from './mysql.svg';
// import useWindowSize from '../../customHooks/useWindowSize';

const Contact: React.FC = () => {
  // const { width } = useWindowSize();
  const arrayImage = [html, css, js, reactjs, nodejs, mongo, java, mysql];
  const listSkill = contact.skill.map((skill, index) => (
    <div
      key={index}
      className="bg-yellow-200 bg-opacity-60 rounded-full text-medium font-semibold py-1 px-2 text-yellow-800 inline-block"
    >
      <img className="inline-block w-5 mx-1" src={arrayImage[index]} alt={skill} width="20" height="20" />
      <span className="align-middle">{skill}</span>
    </div>
  ));

  const listHobby = contact.hobby.map((hobby, index) => (
    <div
      key={index}
      className="bg-indigo-200 bg-opacity-60 rounded-full text-medium font-semibold py-1 px-2 text-indigo-800 inline-block"
    >
      <HashtagIcon className="inline-block w-5 mr-1" />
      <span className="align-middle">{hobby}</span>
    </div>
  ));
  const listProject = contact.project.map((project, index) => {
    return (
      <article className="bg-green-200 bg-opacity-60 my-5 rounded-lg p-3" key={index}>
        <h3 className="tracking-wide text-green-900 font-bold text-lg align-bottom">{project.name}</h3>
        <p className="text-green-800 align-text-top">{project.description}</p>
        <p className="text-green-900 mt-3">
          <cite className="font-semibold">{project.framework}</cite> &amp;{' '}
          <cite className="font-semibold">{project.database}</cite> are frameworks and database.
        </p>
        <p className="text-green-900 mt-3">
          Languages are <cite className="font-semibold">{project.language}</cite> .
        </p>
      </article>
    );
  });
  return (
    <section className="bg-indigo-50 mt-20 shadow-md p-3 mb-3">
      <div className="relative -top-20 grid grid-cols-2 sm:gap-x-5 sm:grid-cols-3">
        <figure className="col-span-3">
          <img
            className="rounded-full h-36 w-36 m-auto shadow-btn"
            src={MyImage}
            alt="MyImage"
            height="200"
            width="200"
          />
          <figcaption className="text-2xl text-indigo-900 font-bold tracking-tight text-center mt-3">
            <span className="align-top">Hoàng Tuấn</span>
            <br />
            <span className="text-xl p-3 align-bottom font-semibold tracking-wide">Information Technology</span>
            <br />
            <span className="font-medium text-lg align-text-top tracking-wide">Web Deveploper</span>
          </figcaption>
        </figure>
        <article className="mt-10 bg-yellow-50 col-span-2 sm:col-span-1 sm:h-fit-content shadow-btn pb-3">
          <h2 className="text-xl font-semibold text-indigo-900 text-center pt-2 pb-1 tracking-wider">Skill</h2>
          <section className="flex flex-wrap gap-x-2 gap-y-3 p-3">{listSkill}</section>
        </article>
        <article className="mt-10 bg-green-50 pb-1 col-span-2 sm:col-span-1 shadow-btn">
          <h2 className="text-xl font-semibold text-indigo-900 text-center pt-2 pb-1 tracking-wider">Project</h2>
          <section className="m-3">{listProject}</section>
        </article>
        <article className="mt-10 col-span-2 sm:col-span-1">
          <h2 className="text-xl font-semibold text-indigo-900 text-center pt-2 pb-1 tracking-wider">Hobby</h2>
          <section className="flex flex-wrap gap-x-2 gap-y-3 p-3">{listHobby}</section>
        </article>
      </div>
    </section>
  );
};

export default Contact;
