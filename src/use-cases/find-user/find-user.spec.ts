import { Test } from '@nestjs/testing';
import { User } from 'src/core/domain/models/User';
import { IUserRepository } from 'src/core/repositories/user.repository';
import { UserRepositoryTypeorm } from 'src/infra/database/repositories/user.repository';
import { FindUserUseCase } from 'src/use-cases/find-user/find-user.usecase';
import { DataSource } from 'typeorm';

describe('Find User - Unit tests', () => {
  let userRepo: IUserRepository;
  let uc: FindUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            getMany: jest.fn(),
          },
        },
      ],
    }).compile();
    userRepo = moduleRef.get<IUserRepository>(IUserRepository);
    uc = moduleRef.get(FindUserUseCase);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const params = {};
      const result = [
        {
          id: 1,
          email: 'some@mail.com',
          name: 'Some name',
          password: '12345678',
        },
      ] as User[];
      jest.spyOn(userRepo, 'getMany').mockResolvedValue(result);

      expect(await uc.execute(params)).toBe(result);
      expect(userRepo.getMany).toHaveBeenCalledWith(params);
    });
  });
});
