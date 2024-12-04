import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';
import { ResetPasswordRequest } from '../interfaces/reset-password-request';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { LinkRequest } from '../interfaces/link-request';
import { Paciente } from '../interfaces/paciente';
import { UpdatePacienteDto } from '../interfaces/UpdatePacienteDto';
import { PacienteView } from '../interfaces/pacienteView';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {



  apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}


getCitasProximas = (): Observable<any[]> =>
  this.http.get<any[]>(`${this.apiUrl}Cita/proximas`);

getUltimosDiarios = (): Observable<any[]> =>
  this.http.get<any[]>(`${this.apiUrl}Diario/profesional/ultimos`);

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/registerPaciente`, data);
  }

  linkPaciente(data: LinkRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}paciente/link`, data);
  }

  getPaciente = (id : number): Observable<Paciente> =>
    this.http.get<Paciente>(`${this.apiUrl}Paciente/pacientes/${id}`);


  deletePaciente = (id : number): Observable<Paciente> =>
    this.http.delete<Paciente>(`${this.apiUrl}Paciente/eliminar-paciente/${id}`);


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

    // Método para modificar un paciente
    modificarPaciente(id: number, updatePacienteDto: UpdatePacienteDto): Observable<any> {
      return this.http.put(`${this.apiUrl}Paciente/modificar-paciente/${id}`, updatePacienteDto);
    }


    getPacientes(): Observable<PacienteView[]> {
      return this.http.get<PacienteView[]>(`${this.apiUrl}Paciente/profesional/pacientes/`);
    }

    registerAppoiment(data: RegisterRequest): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.apiUrl}Cita/registrar-cita`, data);
    }
    getCitas(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}Cita/profesional/citas`);
    }

    getCitaById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}Cita/cita/${id}`);
    }

    reprogramarCita(id: string, nuevaFecha: string, nuevaHora: string): Observable<any> {
      const body = { Fecha: nuevaFecha, Horario: nuevaHora };
      return this.http.put<any>(`${this.apiUrl}Cita/cita/${id}/reagendar`, body);
    }
    aceptarCita(citaId: string): Observable<any> {
      return this.http.put(`${this.apiUrl}Cita/cita/${citaId}/aceptar`, {});
    }
}
