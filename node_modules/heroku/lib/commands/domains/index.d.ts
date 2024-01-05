import { Command } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
export default class DomainsIndex extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        extended: import("@oclif/core/lib/interfaces").Flag<boolean>;
        'no-header': import("@oclif/core/lib/interfaces").Flag<boolean>;
        sort: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        columns: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        filter: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        csv: import("@oclif/core/lib/interfaces").Flag<boolean>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        app: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        remote: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces/parser").CustomOptions>;
        json: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    tableConfig: (needsEndpoints: boolean) => {
        hostname: {
            header: string;
        };
        kind: {
            header: string;
            get: (domain: Heroku.Domain) => "ALIAS or ANAME" | "CNAME" | undefined;
        };
        cname: {
            header: string;
        };
        acm_status: {
            header: string;
            extended: boolean;
        };
        acm_status_reason: {
            header: string;
            extended: boolean;
        };
    };
    run(): Promise<void>;
}
