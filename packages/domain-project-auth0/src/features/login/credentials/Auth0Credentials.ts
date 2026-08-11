import * as fs from 'fs';
import * as path from 'path';
import { Scope } from './Scopes';
import { Auth0Role } from './Auth0Roles';
import { SupplyChainAssignment } from '@qa/domain-auth0';

export interface Auth0UserCredentials {
  auth0_username: string;
  auth0_password: string;
  assignment: SupplyChainAssignment;
}

interface Auth0CredentialsFile {
  ez_users: Record<Scope, Record<Auth0Role, Auth0UserCredentials>>;
}

const credentialsFilePath = path.resolve(process.cwd(), 'auth0-credentials.json');
let cachedFile: Auth0CredentialsFile | null = null;

function loadCredentialsFile(): Auth0CredentialsFile {
  if (!cachedFile) {
    const raw = fs.readFileSync(credentialsFilePath, 'utf-8');
    cachedFile = JSON.parse(raw) as Auth0CredentialsFile;
  }
  return cachedFile;
}

export function getAuth0Credentials(scope: Scope, role: Auth0Role): Auth0UserCredentials {
  const file = loadCredentialsFile();
  const scopeUsers = file.ez_users[scope];
  if (!scopeUsers) {
    throw new Error(`No credentials found for scope: ${scope}`);
  }
  const user = scopeUsers[role];
  if (!user) {
    throw new Error(`No credentials found for role "${role}" under scope "${scope}"`);
  }
  return user;
}