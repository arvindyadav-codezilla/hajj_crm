const Auth = {
    login: () => 'ar/o/token/',
};

const JobType = {
    get: (lang:string) => `${lang}/api/v1/queries`,
    Post: (lang:string) => `${lang}/api/v1/queries`,
    Put: (lang:string) => `${lang}/api/v1/queries`,
    Delete:(lang:string) => `${lang}/api/v1/queries`
};

const Jobs = {
    get: (lang:string) => `${lang}/api/v1/jobs`,
    Post: (lang:string) => `${lang}/api/v1/jobs`,
    Put: (lang:string) => `${lang}/api/v1/jobs`,
    Delete:(lang:string) => `${lang}/api/v1/jobs`
};

const GroupPermission = {
    get: (lang:string) => `${lang}/api/v1/role-permissions`,
    Post: (lang:string) => `${lang}/api/v1/role-permissions`,
    Put: (lang:string) => `${lang}/api/v1/role-permissions`,
    Delete:(lang:string) => `${lang}/api/v1/role-permissions`
};

export { Auth, JobType,GroupPermission,Jobs };
