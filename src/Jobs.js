import { React, useState, useEffect } from 'react';
import data from './local-json/data'

export default function Jobs() {

    const [jobs, setJobs] = useState([]); /* Store the jobs retrieved from Json Data MUST NEVER CHANGE DIRECTLY ONCE LOADED! */
    const [filters, setFilters] = useState([]); /* Store the taxlist of filters */
    const [filteredJobs, setFilteredJobs] = useState([]); /* Store the list of Jobs according to user filters */


    useEffect(()=>{
        setJobs(data);
    }, []);

    useEffect(()=>{
        setFilteredJobs(jobs);
    },[jobs]);

    useEffect(()=>{
        doFilter();
    }, [filters]);


    /* Filter functions */
    /* Add and remove elements in the filter list, apply doFilter() when updated, addFilter() first checks if the clicked element isn't already in the array */
    const addFilter = el => {
        !filters.includes(el) && setFilters(filters => [...filters, el]);
    }

    const removeFilter = el =>{
        setFilters(filters => filters.filter( elem =>{
            return elem != el;
        }));
    }

    /* run in the useEffect everytime the filters state changes */

    const doFilter = () => {
        setFilteredJobs(
            jobs.filter(item =>
              filters.every(filter =>
                [item.role, item.level, ...item.languages, ...item.tools].includes(filter)
              )
            )
          );
    } 

    /* reset everything */

    const clear = () =>{
        setFilters([]);
        setFilteredJobs(jobs);
    }

    return(
        <section className="jobs">
            <header>

            </header>
            <section className="filterList">
                <div className="filterList-tags">
                {filters.map(el=>{
                    return(
                        <h2>{el}<span onClick={e=>{removeFilter(el)}}>{" X"}</span></h2>
                    )
                })}
                </div>
                <span onClick={e=>{clear()}}>{"Clear all"}</span>
            </section>

            <section>
                {filteredJobs.map(item=>{
                    const arrTax = [item.role, item.level, ...item.languages, ...item.tools];
                    const arrMeta = [item.postedAt, item.contract, item.location];
                    return (
                        <article className={item.featured ? "JobItem featured" : "JobItem"}>
                            <section className="JobItem-left">
                                <div className="JobItem-left__Avatar">
                                    <figure>
                                        <img src={item.logo} /> 
                                    </figure>
                                </div>
                                <div className="JobItem-left__content">
                                    <div className="JobItem-left__content-Text">
                                        <div>
                                            <span>{item.company}</span>
                                            {item.new && <span>{" New!"}</span>}
                                            {item.featured && <span>{" Featured"}</span>}
                                        </div>
                                        <h2>{item.position}</h2>
                                    </div>
                                    <div className="JobItem-left__content-Meta">
                                        {
                                            arrMeta.map(meta=>{
                                                    return(
                                                        <span>{meta + " "}</span>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                            <section className="JobItem-right">
                                <div className="JobItem-right__Taxonomy">
                                    {
                                        arrTax.map(tag=>{
                                                return(
                                                    <span onClick={e=>{addFilter(tag)}}>{tag + " "}</span>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </section>
                        </article>
                    )
                })}
            </section>
        </section>
    )
}