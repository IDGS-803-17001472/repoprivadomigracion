import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../interfaces/auth-response';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { Paciente } from '../interfaces/paciente';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { UpdatePacienteDto } from '../interfaces/UpdatePacienteDto';
import { DiariosPaciente } from '../interfaces/entrada';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, data);
  }

  getDetail = (): Observable<UserDetail> =>
    this.http.get<UserDetail>(`${this.apiUrl}account/detail`);

  forgotPassword = (email: string): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/forgot-password`, {
      email,
    });

  resetPassword = (data: ResetPasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/reset-password`, data);

  changePassword = (data: ChangePasswordRequest): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/change-password`, data);

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };

    return userDetail;
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return true;
  };

  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    // if (isTokenExpired) this.logout();
    return true;
  }

  getRoles = (): string[] | null => {
    const token = this.getToken();
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  };

  logout = (): void => {
    localStorage.removeItem(this.userKey);
  };

  getAll = (): Observable<UserDetail[]> =>
    this.http.get<UserDetail[]>(`${this.apiUrl}account`);

  refreshToken = (data: {
    email: string;
    token: string;
    refreshToken: string;
  }): Observable<AuthResponse> =>
    this.http.post<AuthResponse>(`${this.apiUrl}account/refresh-token`, data);

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.token;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: AuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  };


  /* paciente */
  getPacientePsicologo = (): Observable<Paciente[]> =>
    this.http.get<Paciente[]>(`${this.apiUrl}Paciente/profesional/pacientes`);

  eliminarPaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}Paciente/eliminar-paciente/${id}`);
  }

  modificarPaciente(id: number, updatePacienteDto: UpdatePacienteDto): Observable<any> {
    return this.http.put(`${this.apiUrl}Paciente/modificar-paciente/${id}`, updatePacienteDto);
  }
  getListaDiarios = (id: number): Observable<DiariosPaciente[]> =>
    this.http.get<DiariosPaciente[]>(`${this.apiUrl}Diario/paciente/${id}/diarios`);

  getDiario = (id: number): Observable<DiariosPaciente> =>
    this.http.get<DiariosPaciente>(`${this.apiUrl}Diario/diario/${id}`);

}
