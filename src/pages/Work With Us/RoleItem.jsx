export const DetailList = ({ title, items }) =>
    items?.length ? (
        <div>
            <h3 className="font-primary font-bold text-sm text-primary mb-3">{title}</h3>
            <ul className="space-y-2">
                {items.map((item) => (
                    <li key={item} className="font-primary text-sm text-btnPrimary/70 flex gap-3 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    ) : null;

export const RoleItem = ({ role, isOpen, onToggle, onApply }) => {
    const panelId = `role-panel-${role.id}`;
    const meta = [role.type, role.duration, role.location, role.workMode].filter(Boolean);

    return (
        <div className="border-t border-btnPrimary/15 last:border-b">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group w-full flex items-center justify-between gap-6 py-7 text-left cursor-pointer" >
                <span className="block">
                    <span className={`block font-primary text-2xl md:text-4xl transition-colors duration-300 ${ isOpen ? 'text-primary' : 'text-btnPrimary group-hover:text-primary' }`} >
                        {role.name}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-primary text-xs md:text-sm text-btnPrimary/60">
                        {meta.map((item, i) => (
                            <span key={`${item}-${i}`} className="flex items-center gap-3">
                                {i > 0 && <span className="w-1 h-1 rounded-full bg-btnPrimary/25" />}
                                {item}
                            </span>
                        ))}
                    </span>
                </span>

                <span
                    className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                            ? 'bg-primary border-primary text-white rotate-45'
                            : 'border-btnPrimary/20 text-btnPrimary group-hover:border-primary group-hover:text-primary'
                    }`}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            <div
                id={panelId}
                role="region"
                aria-label={`${role.name} details`}
                className={`grid transition-all duration-500 ease-out ${ isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0' }`} >
                <div className=" overflow-hidden min-h-0">
                    <div className="grid gap-10 pb-10 md:grid-cols-3  ">
                        <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
                            <p className="font-primary text-sm text-btnPrimary/70 leading-relaxed">{role.summary}</p>
                            {role.experience && (
                                <span className="inline-block text-xs font-primary px-3 py-1 rounded-full bg-btnPrimary/5 text-btnPrimary/70">
                                    {role.experience}
                                </span>
                            )}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => onApply(role)}
                                    className="font-primary text-sm bg-primary text-white px-4 py-5 rounded-full hover:scale-105 hover:ml-5 transition-all ease-in-out duration-200 cursor-pointer"
                                >
                                    Apply for this role
                                </button>
                            </div>
                        </div>

                        <DetailList title="What you'll do" items={role.responsibilities} />

                        <div className="space-y-8 ">
                            <DetailList title="Skills" items={role.skills} />
                            <DetailList title="Who can apply" items={role.eligibility} />
                            <DetailList title="What you'll learn" items={role.learn} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};